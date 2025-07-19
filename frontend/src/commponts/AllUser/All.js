import Navbar from '../Home/Navbar';
import CardUser from './CardUser';

export default function All() {
  return (
    <>
      <Navbar />
      <div className="conCards">
        <CardUser />
        <CardUser />
        <CardUser />
        <CardUser />
        <CardUser />
      </div>
    </>
  );
}
