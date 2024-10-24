import type { FC, MutableRefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import type SimpleBarCore from 'simplebar-core';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import { chatApi } from 'src/api/chat';
import { Scrollbar } from 'src/components/scrollbar';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import { useDispatch, useSelector } from 'src/store';
import { thunks } from 'src/thunks/chat';
import type { Participant, Thread } from 'src/types/chat';

import { ChatMessageAdd } from './chat-message-add';
import { ChatMessages } from './chat-messages';
import { ChatThreadToolbar } from './chat-thread-toolbar';

const useParticipants = (threadKey: string): Participant[] => {
  const router = useRouter();
  const [participants, setParticipants] = useState<Participant[]>([]);

  const handleParticipantsGet = useCallback(
    async (): Promise<void> => {
      try {
        const participants = await chatApi.getParticipants({ threadKey });
        setParticipants(participants);

      } catch (err) {
        console.error(err);
        router.push(paths.dashboard.chat);
      }
    },
    [router, threadKey]
  );

  useEffect(
    () => {
      handleParticipantsGet();
    },
    
    [threadKey]
  );

  return participants;
};

const useThread = (threadKey: string): Thread | undefined => {
  const router = useRouter();
  const dispatch = useDispatch();
  const thread = useSelector((state) => {
    const { threads, currentThreadId } = state.chat;

    return threads.byId[currentThreadId as string];
  });

  const handleThreadGet = useCallback(
    async (): Promise<void> => {
      // If thread key is not a valid key (thread id or contact id)
      // the server throws an error, this means that the user tried a shady route
      // and we redirect them on the home view

      let threadId: string | undefined;

      try {
        threadId = await dispatch(thunks.getThread({
          threadKey
        })) as unknown as string | undefined;
      } catch (err) {
        console.error(err);
        router.push(paths.dashboard.chat);
        return;
      }

      // Set the active thread
      // If the thread exists, then is sets it as active, otherwise it sets is as undefined

      dispatch(thunks.setCurrentThread({
        threadId
      }));

      // Mark the thread as seen only if it exists

      if (threadId) {
        dispatch(thunks.markThreadAsSeen({
          threadId
        }));
      }
    },
    [router, dispatch, threadKey]
  );

  useEffect(
    () => {
      handleThreadGet();
    },
    
    [threadKey]
  );

  return thread;
};

const useMessagesScroll = (thread?: Thread): {
  messagesRef: MutableRefObject<SimpleBarCore | null>
} => {
  const messagesRef = useRef<SimpleBarCore | null>(null);

  const handleUpdate = useCallback(
    (): void => {
      // Thread does not exist
      if (!thread) {
        return;
      }

      // Ref is not used
      if (!messagesRef.current) {
        return;
      }

      const container = messagesRef.current;
      const scrollElement = container!.getScrollElement();

      if (scrollElement) {
        scrollElement.scrollTop = container.el.scrollHeight;
      }
    },
    [thread]
  );

  useEffect(
    () => {
      handleUpdate();
    },
    
    [thread]
  );

  return {
    messagesRef
  };
};

interface ChatThreadProps {
  threadKey: string;
}

export const ChatThread: FC<ChatThreadProps> = (props) => {
  const { threadKey, ...other } = props;
  const dispatch = useDispatch();
  const user = useMockedUser();
  const thread = useThread(threadKey);
  const participants = useParticipants(threadKey);
  const { messagesRef } = useMessagesScroll(thread);

  const handleSend = useCallback(
    async (body: string): Promise<void> => {
      // If we have the thread, we use its ID to add a new message

      if (thread) {
        try {
          await dispatch(thunks.addMessage({
            threadId: thread.id,
            body
          }));
        } catch (err) {
          console.error(err);
        }

        return;
      }

      // Otherwise we use the recipients IDs. When using participant IDs, it means that we have to
      // get the thread.

      // Filter the current user to get only the other participants

      const recipientIds = participants
        .filter((participant) => participant.id !== user.id)
        .map((participant) => participant.id);

      // Add the new message

      let threadId: string;

      try {
        threadId = await dispatch(thunks.addMessage({
          recipientIds,
          body
        })) as unknown as string;
      } catch (err) {
        console.error(err);
        return;
      }

      // Load the thread because we did not have it

      try {
        await dispatch(thunks.getThread({
          threadKey: threadId
        }));
      } catch (err) {
        console.error(err);
        return;
      }

      // Set the new thread as active

      dispatch(thunks.setCurrentThread({ threadId }));
    },
    [dispatch, participants, thread, user]
  );

  // Maybe implement a loading state

  return (
    <Stack
      sx={{
        flexGrow: 1,
        overflow: 'hidden'
      }}
      {...other}
    >
      <ChatThreadToolbar participants={participants} />
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'hidden'
        }}
      >
        <Scrollbar
          ref={messagesRef}
          sx={{ maxHeight: '100%' }}
        >
          <ChatMessages
            messages={thread?.messages || []}
            participants={thread?.participants || []}
          />
        </Scrollbar>
      </Box>
      <Divider />
      <ChatMessageAdd onSend={handleSend} />
    </Stack>
  );
};

ChatThread.propTypes = {
  threadKey: PropTypes.string.isRequired
};
