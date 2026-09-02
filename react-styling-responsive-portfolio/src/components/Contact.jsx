import { useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.section`
  width: min(1080px, calc(100% - 36px));
  margin: 0 auto 40px;
  padding: 38px;
  border-radius: 26px;
  background: #182033;
  color: white;
  @media (max-width: 600px) { padding: 25px; }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 24px;
  label { display: grid; gap: 7px; font-size: 13px; font-weight: 700; }
  input, textarea {
    width: 100%;
    border: 1px solid #39445b;
    border-radius: 10px;
    padding: 12px;
    background: #222c42;
    color: white;
  }
  textarea { min-height: 115px; resize: vertical; }
  .full { grid-column: 1 / -1; }
  button {
    justify-self: start;
    border: 0;
    border-radius: 10px;
    padding: 12px 17px;
    background: white;
    color: #182033;
    font-weight: 800;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    .full { grid-column: auto; }
  }
`;

export default function Contact() {
  const [sent, setSent] = useState(false);

  function submit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <Wrap id="contact">
      <h2>Let's connect</h2>
      <p>Have an idea? Send a message and I'll get back to you.</p>
      <Form onSubmit={submit}>
        <label>Name<input required placeholder="Your name" /></label>
        <label>Email<input required type="email" placeholder="you@example.com" /></label>
        <label className="full">Message<textarea required placeholder="Tell me about your project..." /></label>
        <button type="submit">{sent ? 'Message ready ✓' : 'Send message'}</button>
      </Form>
    </Wrap>
  );
}