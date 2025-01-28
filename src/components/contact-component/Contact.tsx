import styles from '../contact-component/Contact.module.css';

const Contact = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      alert('Message sent successfully');
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  return (
    <div className={styles.container}>
      {/* Contact Info Section */}
      <div className={styles.contactInfo}>
        <h3>Call To Us</h3>
        <p>We are available 24/7, 7 days a week.</p>
        <p>
          Phone: <a href="tel:+94752283880">+94 752 283 880</a>
        </p>

        <h3>Write To Us</h3>
        <p>Fill out our form and we will contact you within 24 hours.</p>
        <p>
          Email: <a href="mailto:customer@excluslive.com">customer@excluslive.com</a>
        </p>
        <p>
          Email: <a href="mailto:lajee001@gmail.com">lajee001@gmail.com</a>
        </p>
      </div>

      {/* Contact Form Section */}
      <div className={styles.contactForm}>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name *" required />
          <input type="email" name="email" placeholder="Your Email *" required />
          <input type="tel" name="phone" placeholder="Your Phone *" required />
          <textarea name="message" rows={5} placeholder="Your Message" required />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
