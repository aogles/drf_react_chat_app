import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function ChannelsList() {
  const [channels, setChannels] = useState(null);
  const [messages, SetMessages] = useState(null);

  useEffect(() => {
    const getChannels = async () => {
      const response = await fetch("/api_v1/books/");

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
      author: "author goes here",
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrfttoken"),
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

  const addMessage = async () => {
    const message = {
      book: 2,
      text: "lets discuss baby yoda",
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrfttoken"),
      },
      body: JSON.stringify(message),
    };
    const response = await fetch("/api_v1/channels/2/messages/", options);
    if (!response.ok) {
      throw new Error("network repsonse not ok.");
    }
    const data = await response.json();
  };

  if (!channels) {
    return <div>Fetching data ...</div>;
  }
  const channelsHTML = channels.map((channel) => (
    <li key={channel.id}>{channel.title}</li>
  ));
  return (
    <div className="App">
      {channelsHTML}
      <button type="button" onClick={addChannel}>
        add Chat Group
      </button>
      <button type="button" onClick={addMessage}>
        add Message
      </button>
    </div>
  );
}

export default ChannelsList;
