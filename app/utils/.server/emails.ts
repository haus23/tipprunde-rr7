import { env } from './env';

/**
 * Notifies admin about a security breach
 *
 * @param props Subject and email body
 */
export async function sendErrorMail(props: { subject: string; text: string }) {
  await sendMail({
    from: 'Tipprunde Security <security@runde.tips>',
    to: 'Micha <micha@haus23.net>',
    category: 'security',
    ...props,
  });
}

/**
 * Sends email with login code to user
 *
 * @param props Username, email-address and the login code
 */
export async function sendCodeMail(props: {
  userName: string;
  code: string;
  email: string;
  magicLink: string;
}) {
  const { userName, code, email, magicLink } = props;

  await sendMail(
    {
      from: 'Tipprunde <hallo@runde.tips>',
      to: `${userName} <${email}>`,
      subject: 'Tipprunde Login Code',
      category: 'totp',
      text: `
      Hallo ${userName}!
      Dein Login-Code ist: ${code}
      Du kannst dich auch per Link anmelden: ${magicLink}
      `,
    },
    'Postmark',
  );
}

// Abstraction Layer

type EmailProps = {
  from: string;
  to: string;
  subject: string;
  html?: string;
  text: string;
  category: string;
};

type Provider = 'Resend' | 'Postmark';

async function sendMail(props: EmailProps, provider: Provider = 'Resend') {
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
      'X-Postmark-Server-Token': `${env.POSTMARK_TOKEN}`,
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
      Authorization: `Bearer ${env.RESEND_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Probleme beim Email-Versand');
  }
}
