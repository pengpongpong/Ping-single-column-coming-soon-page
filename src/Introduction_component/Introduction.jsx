import React from "react";
import { useRef, useState } from "react";

function Introduction() {
  const [message, setMessage] = useState("");
  const emailInput = useRef();
  const res_message = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();

    // email regex
    const validEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const email = emailInput.current.value;

    // email valid check
    if (!email.match(validEmail)) {
      emailInput.current.style.border = "1px solid hsl(354, 100%, 66%)";
      res_message.current.style.color = "hsl(354, 100%, 66%)";
      setMessage("Please provide a valid email address");
    } else {
      try {
        emailInput.current.style.border = "1px solid hsl(223, 100%, 88%)";
        const res = await fetch("api/email_registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        });

        // show response message if response is ok
        if (!res.ok) {
          console.error(res.status);
        } else {
          emailInput.current.value = "";
          const data = await res.json();
          setMessage(data.message);
          if (data.message === "You've been successfully registered") {
            res_message.current.style.color = "#0ec40e";
          } else {
            res_message.current.style.color = "hsl(354, 100%, 66%)";
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    <section className="coming_soon">
      <h1 className="title">
        <span>We are launching</span> soon!
      </h1>
      <p>Subscribe and get notified</p>
      <form className="email_registration" onSubmit={onSubmit}>
        <input placeholder="Your email address..." ref={emailInput} />
        <p className="response_message" ref={res_message}>
          {message}
        </p>
        <button>Notify Me</button>
      </form>
    </section>
  );
}

export default Introduction;
