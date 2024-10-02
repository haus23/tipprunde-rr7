type EmailProps = {
  from: string;
  to: string;
  subject: string;
  html?: string;
  text: string;
  category: string;
};

type Provider = 'Resend' | 'Postmark';

export async function sendMail(
  props: EmailProps,
  provider: Provider = 'Resend',
) {
  if (provider === 'Postmark') return await sendMailWithPostmark(props);
  return await sendMailWithResend(props);
}

async function sendMailWithPostmark({
  from,
  to,
  subject,
  html,
  text,
  category,
}: EmailProps) {
  const httpBody = {
    From: from,
    To: to,
    Subject: subject,
    HtmlBody: html,
    TextBody: text,
    Tag: category,
    MessageStream: 'outbound',
  };

  const response = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    body: JSON.stringify(httpBody),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': `${process.env.POSTMARK_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Probleme beim Email-Versand');
  }
}

async function sendMailWithResend(props: EmailProps) {
  const { from, to, subject, html, text } = props;
  const httpBody = {
    from,
    to,
    subject,
    html,
    text,
    tags: [{ name: 'category', value: props.category }],
  };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    body: JSON.stringify(httpBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Probleme beim Email-Versand');
  }
}
