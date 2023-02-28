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
    };
    const getMessages = async () => {
      const response = await fetch("/api_v1/channels/messages/");
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setMessages(data);
    };

    getChannels();
    getMessages();
  }, []);

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

  const selectChannel = async (id) => {
    const response = await fetch(`/api_v1/channels/${id}/messages/`);

    if (!response.ok) {
      throw new Error("Network response was not OK,Messages");
    }

    const data = await response.json();
    setSelectedChannel(data);
    setMessages(data);
  };

  const channelsHTML = channels?.map((channel) => (
    <button
      key={channel.id}
      type="button"
      onClick={() => selectChannel(channel.id)}
    >
      {channel.title}
    </button>
  ));

  const addMessage = async (channel) => {
    try {
      const newMessage = { caption };
      const response = await fetch(`/api_v1/channels/${channel.id}/messages/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) {
        throw new Error("Failed to add message");
      }

      const data = await response.json();

      setMessages([...messages, data]);
      setCaption("");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMessage = async (id) => {
    const response = await fetch(`/api_v1/messages/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete message");
    }

    const messagesAfterDelete = messages.filter((message) => message.id !== id);
    setMessages(messagesAfterDelete);
  };

  const editMessage = async (id, newCaption) => {
    const response = await fetch(`/api_v1/messages/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({ caption: newCaption }),
    });
    if (!response.ok) {
      throw new Error("Failed to update message");
    }
    const data = await response.json();
    const messagesAfterEdit = messages.map((message) =>
      message.id === id ? { ...message, caption: newCaption } : message
    );
    setMessages(messagesAfterEdit);
  };

  const messagesHTML = (selectedChannel ? selectedChannel : messages).map(
    (message) => (
      <div key={message.id}>
        <p>{message.caption}</p>
        <button type="button" onClick={() => deleteMessage(message.id)}>
          Delete Message
        </button>
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
      </div>
    )
  );

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
            <button type="button" onClick={() => addMessage(selectedChannel)}>
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
