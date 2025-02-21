export type MyLinkProps = {
  label: string;
  url: string;
}

//props - объект с аттрбутами
export default function MyLink(props: MyLinkProps) {
  console.log('#MyLink', props);

  return (
  <a
    className="App-link"
    href= {props.url}
    target="_blank"
    rel="noopener noreferrer"
  >
  {props.label}
</a>);
}