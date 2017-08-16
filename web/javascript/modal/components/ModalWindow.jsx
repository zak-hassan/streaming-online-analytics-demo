import React,{Component} from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

class ModalComponentDialog extends Component{
  // Ensure that the toggleModal is the same that is passed to
  // ButtonModal
  static get propTypes() {
    return {
      toggleModal: PropTypes.func.isRequired,
      isOpen: PropTypes.bool.isRequired,
      modalTitle: PropTypes.string.isRequired,
      modalContent: PropTypes.element.isRequired,
      modalFooter: PropTypes.element,
    }
  }

  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(){
    this.props.toggleModal();
  }

  render(){
    /*const status = modalStatus ? "Verdadero": "Falso";*/
    let footer = null;
    if(this.props.modalFooter){
      footer = this.props.modalFooter;
    }else {
      footer =
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Close</button>
        </div>
    }

    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          contentLabel="Modal"
          onRequestClose={this.closeModal}
          className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.closeModal} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{this.props.modalTitle}</h4>
            </div>
            <div className="modal-body">
              {this.props.modalContent}
            </div>
            {footer}
          </div>
        </Modal>
      </div>
    );
  }
}



export default ModalComponentDialog;

