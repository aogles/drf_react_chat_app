import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function ChannelsList() {
  const [channels, setChannels] = useState(null);
  const [messages, setMessages] = useState(null);
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

    getChannels();
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
    setSelectedChannel(id);
    setMessages(data);
  };

  const addMessage = async () => {
    const message = {
      channel: 1,
      text: "lets discuss baby yoda",
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(message),
    };
    const response = await fetch("/api_v1/channels/1/messages/", options);
    if (!response.ok) {
      throw new Error("network repsonse not ok.");
    }
    const data = await response.json();
  };

  if (!channels) {
    return <div>Fetching data ...</div>;
  }
  const channelsHTML = channels.map((channel) => (
    <button
      key={channel.id}
      type="button"
      onClick={() => selectChannel(channel.id)}
    >
      {channel.title}
    </button>
  ));

  const messagesHTML =
    messages && messages.map((message) => <div key={message.id}></div>);
  //document.message.submit();
  console.log(messagesHTML);
  return (
    <div className="App">
      <Card>
        <Card.Header>{channelsHTML}</Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <Form.Label>Chat Message</Form.Label>
          <Form.Control
            addMessage={addMessage}
            type="text"
            id="message"
            placeholder="Enter your message here"
          />
          <Button type="submit" onClick={addMessage} variant="primary">
            add Message
          </Button>
        </Card.Body>
      </Card>

      {messages && messagesHTML}

      <button type="button" onClick={addChannel}>
        add Chat Group
      </button>
    </div>
  );
}

export default ChannelsList;
