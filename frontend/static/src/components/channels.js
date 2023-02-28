import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function ChannelsList() {
  const [caption, setCaption] = useState("");
  const [channels, setChannels] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    const getChannels = async () => {
      const response = await fetch("/api_v1/channels/");

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setChannels(data);
      setSelectedChannel(data[0].id);
    };
    getChannels();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      const response = await fetch(
        `/api_v1/channels/messages/?channel=${selectedChannel}`
      );
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setMessages(data);
    };

    if (!!selectedChannel) {
      getMessages();
    }
  }, [selectedChannel]);

  const addChannel = async () => {
    const channel = {
      title: "a chat group added",
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(channel),
    };
    const response = await fetch("/api_v1/channels/", options);
    if (!response.ok) {
      throw new Error("network repsonse not ok.");
    }
    const data = await response.json();

    setChannels([...channels, data]);
  };

  const addMessage = async (channel) => {
    const newMessage = {
      text: caption,
      channel: selectedChannel,
    };

    const response = await fetch(`/api_v1/channels/messages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(newMessage),
    }).catch((err) => console.warn(err));

    if (!response.ok) {
      throw new Error("Failed to add message");
    }

    const data = await response.json();

    setMessages([...messages, data]);
    setCaption("");
  };

  const deleteMessage = async (id) => {
    const response = await fetch(`/api_v1/channels/messages/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete message");
    }

    setMessages(messages.filter((message) => message.id !== id));
  };

  const editMessage = (id, newCaption) => {
    setMessages(
      messages.map((message) =>
        message.id === id ? { ...message, caption: newCaption } : message
      )
    );
  };

  const channelsHTML = channels?.map((channel) => (
    <button
      key={channel.id}
      type="button"
      onClick={() => setSelectedChannel(channel.id)}
    >
      {channel.title}
    </button>
  ));

  const messagesHTML = messages.map((message) => (
    <div key={message.id}>
      <p>{message.text}</p>
      <p>{message.username}</p>
      {(message.role === "user" || message.role === "admin") && (
        <button type="button" onClick={() => deleteMessage(message.id)}>
          Delete Message
        </button>
      )}

      {message.role === "user" && (
        <button
          type="button"
          onClick={() =>
            editMessage(
              message.id,
              prompt("Enter the new caption for this message:")
            )
          }
        >
          Edit
        </button>
      )}
    </div>
  ));

  return (
    <div className="App">
      <Card>
        <Card.Header>{channelsHTML}</Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <Form.Label>Channel name</Form.Label>
          <button type="button" onClick={addChannel}>
            add Chat Group
          </button>
        </Card.Body>
      </Card>
      <form
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit");
        }}
      >
        <div className="toast-body">
          <input
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
            type="text"
            name="caption"
            placeholder="Enter your message here"
          />
          <div className="mt-2 pt-2 border-top">
            <button type="button" onClick={addMessage}>
              add message
            </button>
          </div>
        </div>
      </form>
      {messagesHTML}
    </div>
  );
}

export default ChannelsList;
