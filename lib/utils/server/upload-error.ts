interface Props {
  name: string;
  stack: string;
  message: string;
  source: string;
}

async function uploadError(error: Props) {
  await fetch(`${process.env.BASE_URL}/next-error-log`, {
    method: "POST",
    body: JSON.stringify(error),
  });
}

export default uploadError;
