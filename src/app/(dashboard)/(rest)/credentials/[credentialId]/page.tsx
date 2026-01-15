interface CredentialPageProps
  extends PageProps<"/credentials/[credentialId]"> {}

async function CredentialPage({ params }: CredentialPageProps) {
  const { credentialId } = await params;
  return <div>CredentialPage id: {credentialId}</div>;
}

export default CredentialPage;
