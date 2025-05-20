import axios from 'axios';

const API_URL = 'http://localhost:8000/community';

export interface Topic {
  id: number;
  title: string;
  content?: string;
  category: string;
  user_id: number;
  created_at: string;
  likes: number;
  user: {
    id: number;
    email: string;
  };
  comments: Comment[];
  tags: { id: number; name: string }[];
}

export interface Comment {
  id: number;
  content: string;
  user_id: number;
  topic_id: number;
  created_at: string;
  likes: number;
  user: {
    id: number;
    email: string;
  };
}

export interface Event {
  id: number;
  title: string;
  description?: string;
  date: string;
  time: string;
  location: string;
  created_by: number;
  creator: {
    id: number;
    email: string;
  };
  attendees: {
    id: number;
    email: string;
  }[];
}

export const communityService = {
  // Topics
  async getTopics(category?: string): Promise<Topic[]> {
    const response = await axios.get(`${API_URL}/topics`, {
      params: { category },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  async createTopic(topic: {
    title: string;
    content?: string;
    category: string;
    tags?: string[];
  }): Promise<Topic> {
    const response = await axios.post(
      `${API_URL}/topics`,
      topic,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  },

  async likeTopic(topicId: number): Promise<void> {
    await axios.post(
      `${API_URL}/topics/${topicId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  },

  // Comments
  async getComments(topicId: number): Promise<Comment[]> {
    const response = await axios.get(`${API_URL}/topics/${topicId}/comments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  async createComment(topicId: number, content: string): Promise<Comment> {
    const response = await axios.post(
      `${API_URL}/topics/${topicId}/comments`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  },

  // Events
  async getEvents(): Promise<Event[]> {
    const response = await axios.get(`${API_URL}/events`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  async createEvent(event: {
    title: string;
    description?: string;
    date: string;
    time: string;
    location: string;
  }): Promise<Event> {
    const response = await axios.post(
      `${API_URL}/events`,
      event,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  },

  async joinEvent(eventId: number): Promise<void> {
    await axios.post(
      `${API_URL}/events/${eventId}/join`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  },
}; 