import NearMeModalContent from "./NearMeModalContent.jsx";

const NearMeModal = (props) => {
  return (
    <div className="nearMeModalPage">
      <div className="nearMeModalContainer">
        <span onClick={props.toggleModal} className="closeNearMeModal"><p>Close</p><p id="xicon">  &times;</p></span>
        <NearMeModalContent host={props.host} category={props.category} nearby={props.nearby} />
      </div>
    </div>
  )
}

export default NearMeModal;