interface Props {
  name: string;
  stack: string;
  message: string;
  source: string;
  isClient?: boolean;
}

async function uploadError(error: Props) {
  const endpoint = error.isClient ? "/api/next-error-log" : `${process.env.BASE_URL}/api/next-error-log`;
  await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(error),
  });
}

export default uploadError;
