type EntryPageProps = {
  params: {
    entryID: string;
  };
};

export default function EntryPage({ params }: EntryPageProps) {
  return <h1>{params?.entryID}</h1>;
}
