// import { useEffect, useState } from "react";
// import api from "../../api";

function PurchaseHistory() {
  // const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  // useEffect(() => {
  //   let mounted = true;

  //   async function loadOrders() {
  //     try {
  //       const data = await api.getUserOrders();
  //       if (!mounted) return;
  //       setOrders(Array.isArray(data) ? data : []);
  //     } catch (_error) {
  //       if (!mounted) return;
  //       console.error("Error fetching orders:", _error);
  //       setError("Kunde inte hämta köphistorik.");
  //     } finally {
  //       if (mounted) {
  //         setLoading(false);
  //       }
  //     }
  //   }

  //   loadOrders();

  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

  // if (loading) {
  //   return <p>Laddar köphistorik...</p>;
  // }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  // if (orders.length === 0) {
  //   return <p>Du har inga sparade ordrar ännu.</p>;
  // }

  return (
    <div>
      <h3>Orderhistorik</h3>
      <p>Snart kommer en lista över dina beställningar att visas.</p>
      {/* {orders.map((order) => (
        <article key={order._id}>
          <h3>Order {order._id?.slice(-6)}</h3>
          <p>Datum: {new Date(order.createdAt).toLocaleString("sv-SE")}</p>
          <p>Total: {Number(order.cartTotal || 0)} kr</p>
          <ul>
            {(order.items || []).map((item) => (
              <li key={`${order._id}-${item.isbn}`}>
                {item.title} x {item.quantity} - {item.price} kr/st
              </li>
            ))}
          </ul>
        </article>
      ))} */}
    </div>
  );
}

export default PurchaseHistory;
