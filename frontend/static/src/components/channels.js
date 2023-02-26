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
    setSelectedChannel(id);
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

  const messagesHTML = messages?.map((message) => (
    <div key={message.id}>{message.text}</div>
  ));

  // console.log(caption);

  const addMessage = async (event) => {
    event.preventDefault();

    const newMessage = {
      text: caption,
      channel: selectChannel,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(newMessage),
    };
    const response = await fetch("/api_v1/channels/messages", options);
    if (!response.ok) {
      throw new Error("network repsonse not ok.");
    }
    const data = await response.json();

    setMessages([...messages, data]);

    setCaption("");
  }; // fetch request will send caption to the
  // need to send the channel id in the params
  console.log(caption);
  console.log(selectedChannel);

  //editMessage

  //deleteMessage
  const deleteMessage = asyn (event) => {
    const id= event.currentTarget.value;
    const options = {
      method: "DELETE",
      headers:{ "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),}
    };

 }; 
};
const response = await fetch("/api_v1/channels/messages", options);
if (!response.ok) {
  throw new Error("network repsonse not ok.");
} // fetch request will delete message on the detail apiview

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

      <form role="alert" aria-live="assertive" aria-atomic="true">
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
              {" "}
              add message
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => console.log("submit")}
            >
              Delete Message
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-bs-dismiss="toast"
              onSubmit={() => console.log("submit")}
            >
              Edit
            </button>
          </div>
        </div>
      </form>
      {messagesHTML}
    </div>
  );
}
export default ChannelsList;
