import React from 'react'


const MenuItemsCard = ({ menuItem }) => {
  console.log(menuItem)
  return (
    <div>
      <p>{menuItem.name}</p>
      <p>{menuItem.description}</p>
      <p>{menuItem.price}</p>
    </div>
  )
}

export default MenuItemsCard