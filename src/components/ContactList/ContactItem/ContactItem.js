import PropTypes from 'prop-types';
import { Contact, Delete } from './ContactItem.styled';

export const ContactItem = ({ id, name, number, onDelete }) => {
  return (
    <Contact>
      <p>
        {name}: {number}
      </p>
      <Delete type="button" onClick={() => onDelete(id)}>
        Delete
      </Delete>
    </Contact>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
