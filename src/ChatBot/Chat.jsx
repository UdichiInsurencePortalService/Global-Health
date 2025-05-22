import React, { useState, useEffect, useRef } from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { MessageSquare, Send, X, MessageCircle } from 'lucide-react';
import './Chat.css'; // We'll keep the existing CSS file

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Welcome! I am chatbot, you can ask doubts related to Global Heath & Allied Insurance Service",
      animate: true,
      typing: true
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimerRef = useRef(null);

  // Auto scroll to bottom when new messages appear
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clear typing timer on component unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  // Complete the typewriter effect after animation
  useEffect(() => {
    const typingMessage = messages.find(msg => msg.typing);
    if (typingMessage) {
      typingTimerRef.current = setTimeout(() => {
        setMessages(messages.map(msg => 
          msg.typing ? { ...msg, typing: false } : msg
        ));
      }, 3000); // The typing animation takes about 3 seconds
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input, animate: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
        // First wait 2 seconds for loading animation as requested
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const response = await axios.post("http://localhost:8080/api/query", {
          question: input,
        });
  
        const botMessage = {
          role: "bot",
          text: response.data.answer || "No response",
          animate: true
        };
        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "Error: Could not get answer.", animate: true },
        ]);
        setLoading(false);
      }
    };
  
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

  return (
    <div className="customer-section">
      <div className="customer">
        
      </div>
      <div className="chatbot-container">
        {isOpen ? (
          <Container className="d-flex align-items-center justify-content-center chatbot-window">
            <Card className="chatbot-card shadow-lg">
              <Card.Header className="chatbot-header d-flex align-items-center p-3 justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="chat-avatar">
                    <MessageSquare size={20} className="icon-white" />
                  </div>
                  <h4 className="mb-0 fw-bold ms-2">Company Assistant</h4>
                </div>
                <Button 
                  variant="link" 
                  className="close-button p-0" 
                  onClick={toggleChat}
                >
                  <X size={20} />
                </Button>
              </Card.Header>
              <Card.Body className="d-flex flex-column p-0">
                <div className="messages-container flex-grow-1 overflow-auto p-3">
                  {messages.map((msg, index) => (
                    <Row key={index} className={`mb-3 ${msg.role === "user" ? "justify-content-end" : "justify-content-start"}`}>
                      <Col xs="auto" className={`message-col ${msg.role === "user" ? "pe-1" : "ps-1"}`}>
                        {msg.role === "bot" && (
                          <div className="bot-avatar">
                            <MessageSquare size={16} />
                          </div>
                        )}
                        <div 
                          className={`message p-3 rounded-lg ${msg.role === "user" 
                            ? "user-message" 
                            : "bot-message"} ${msg.animate ? "animate-in" : ""}`}
                        >
                          {msg.typing ? (
                            <div className="typewriter">{msg.text}</div>
                          ) : (
                            msg.text
                          )}
                        </div>
                      </Col>
                    </Row>
                  ))}
                  {loading && (
                    <Row className="mb-3 justify-content-start">
                      <Col xs="auto" className="message-col ps-1">
                        <div className="bot-avatar">
                          <MessageSquare size={16} />
                        </div>
                        <div className="message p-3 rounded-lg bot-message animate-in">
                          <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="input-area p-3">
                  <div className="d-flex gap-2">
                    <Form.Control
                      as="textarea"
                      rows={1}
                      placeholder="Type your question..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="chat-input"
                    />
                    <Button 
                      variant="primary"
                      onClick={handleSend}
                      disabled={loading}
                      className="send-button"
                      aria-label="Send message"
                    >
                      <Send size={20} />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Container>
        ) : (
          <button onClick={toggleChat} className="chatbot-button">
            <MessageCircle size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Chat;