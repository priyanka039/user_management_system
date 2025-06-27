import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrivileges, createPrivilege, editPrivilege, removePrivilege } from '../app/privilegesSlice';
import { Box, Button, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const defaultForm = { name: '', description: '', resource: '' };

const PrivilegesPage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.privileges);
  const [open, setOpen] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [form, setForm] = React.useState(defaultForm);

  React.useEffect(() => {
    dispatch(fetchPrivileges());
  }, [dispatch]);

  const handleOpen = (privilege) => {
    setEditId(privilege ? privilege.id : null);
    setForm(privilege ? privilege : defaultForm);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(defaultForm);
    setEditId(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editId) {
      dispatch(editPrivilege({ id: editId, updates: form }));
    } else {
      dispatch(createPrivilege(form));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(removePrivilege(id));
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    { field: 'resource', headerName: 'Resource', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpen(params.row)}><EditIcon /></IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} color="error"><DeleteIcon /></IconButton>
        </>
      ),
      width: 120,
    },
  ];

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Privileges</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen(null)}>
          Add Privilege
        </Button>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          autoHeight
          rows={items}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableSelectionOnClick
        />
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Edit Privilege' : 'Add Privilege'}</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Resource" name="resource" value={form.resource} onChange={handleChange} fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{editId ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PrivilegesPage; 