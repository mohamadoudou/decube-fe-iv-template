export default function Movie() {
  useParams();

  return <div>detail page {console.log(useParams())}</div>;
}
