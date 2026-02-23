import { CAFE_CONTACT } from '../config/contact';

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

const getMissingEnvKeys = () => {
  const requiredKeys = [
    'VITE_EMAILJS_SERVICE_ID',
    'VITE_EMAILJS_CUSTOMER_TEMPLATE_ID',
    'VITE_EMAILJS_CAFE_TEMPLATE_ID',
    'VITE_EMAILJS_PUBLIC_KEY',
  ];

  return requiredKeys.filter((key) => !import.meta.env[key]);
};

const sendEmail = async ({ templateId, templateParams }) => {
  const payload = {
    service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    template_id: templateId,
    user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    template_params: templateParams,
  };

  const response = await fetch(EMAILJS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`EmailJS request failed with status ${response.status}`);
  }
};

export const sendBookingEmails = async ({
  customerName,
  customerEmail,
  customerPhone,
  bookingDate,
  bookingTime,
  guests,
  paymentMethod,
  requests,
}) => {
  const missingEnvKeys = getMissingEnvKeys();
  if (missingEnvKeys.length > 0) {
    console.warn(
      `Email notifications skipped: missing env keys -> ${missingEnvKeys.join(', ')}.`
    );
    return;
  }

  const cafeEmail = import.meta.env.VITE_CAFE_NOTIFICATION_EMAIL || CAFE_CONTACT.email;

  const commonParams = {
    customer_name: customerName,
    customer_email: customerEmail,
    customer_phone: customerPhone,
    booking_date: bookingDate,
    booking_time: bookingTime,
    guests,
    payment_method: paymentMethod,
    special_requests: requests || 'None',
    cafe_name: 'BrewCafe',
  };

  const customerMail = sendEmail({
    templateId: import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID,
    templateParams: {
      ...commonParams,
      to_email: customerEmail,
      message_subject: 'Your BrewCafe Booking is Confirmed',
    },
  });

  const cafeMail = sendEmail({
    templateId: import.meta.env.VITE_EMAILJS_CAFE_TEMPLATE_ID,
    templateParams: {
      ...commonParams,
      to_email: cafeEmail,
      message_subject: 'New Table Booking Received',
    },
  });

  await Promise.all([customerMail, cafeMail]);
};
