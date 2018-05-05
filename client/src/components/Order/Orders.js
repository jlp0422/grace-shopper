import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* THINGS TO ADD:
- PAGINATION
- SEARCH
- FILTER FOR ORDER STATUS
*/

class Orders extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      startIndex: 0,
      endIndex: 20,
      statusView: 'all'
    }
    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
    // this.onPrevPage = this.onPrevPage.bind(this)
    // this.onNextPage = this.onNextPage.bind(this)
  }

  onChange(ev) {
    this.setState({ name: ev.target.value, startIndex: 0, endIndex: 20 })
  }

  onCheck(ev) {
    const { value } = ev.target
    this.setState({ statusView: value })
  }

  render() {
    const { orders, user } = this.props
    const { onChange, onCheck } = this
    const { statusView } = this.state
    console.log(statusView)
    const statuses = [ 'cart', 'processed', 'shipped', 'complete', 'all' ]
    const allOrders = user ? orders.filter(order => order.userId === user.id) : orders
    const ordersToShow = allOrders.filter(order => statusView === 'all' ? order : order.status === statusView)

    return (
      <div>
        <h2>Order history { user ? `for ${user.firstName} ${user.lastName}` : null }</h2>
        {
          statuses.map(status => (
            <div key={ status } className="form-check form-check-inline">
              <input className="form-check-input" onChange={onCheck} type="radio" value={status} />
              <label className="form-check-label">{status}</label>
            </div>
          ))
        }
        <ul className="list-group">
          {
            ordersToShow.map(order => (
              <div key={ order.id }>
                <li className="list-group-item">
                  <Link to={`/admin/orders/${order.id}`}>Order #{order.id}</Link>
                  <br/>Status: {order.status}
                </li>
              </div>
            ))
          }
        </ul>
      </div>
    )
  }
}

const mapState = ({ orders, users }, { id }) => {
  const user = users.find(user => user.id === id)
  return { orders, user }
}

export default connect(mapState)(Orders);
