import { useParams } from "react-router";
import { Container } from "@mui/material";
import AddEditUserForm from "./AddEditUserForm";

const AddEditUser = () => {
  const { id } = useParams();
  return (
    <Container maxWidth="sm">
      <AddEditUserForm id={id} />
    </Container>
  );
};

export default AddEditUser;
