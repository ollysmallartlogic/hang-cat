interface Props {
  onBegin: () => void;
}

export function TitleScreen({ onBegin }: Props) {
  return (
    <main style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
      <h1>Hang Cat</h1>
      <p>吊り猫</p>
      <button type="button" onClick={onBegin}>
        begin
      </button>
    </main>
  );
}
