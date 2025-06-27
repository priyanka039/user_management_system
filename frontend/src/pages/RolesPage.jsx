import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, createRole, editRole, removeRole } from '../app/rolesSlice';
import { Box, Button, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const defaultForm = { name: '', description: '', privileges: '' };

const RolesPage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.roles);
  const [open, setOpen] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [form, setForm] = React.useState(defaultForm);

  React.useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleOpen = (role) => {
    setEditId(role ? role.id : null);
    setForm(role ? { ...role, privileges: Array.isArray(role.privileges) ? role.privileges.join(', ') : '' } : defaultForm);
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
    const roleData = { ...form, privileges: form.privileges.split(',').map((p) => p.trim()).filter(Boolean) };
    if (editId) {
      dispatch(editRole({ id: editId, updates: roleData }));
    } else {
      dispatch(createRole(roleData));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(removeRole(id));
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    { field: 'privileges', headerName: 'Privileges', flex: 2, valueGetter: (params) => {
      const row = params?.row || {};
      const privileges = row.privileges;
      if (Array.isArray(privileges)) return privileges.join(', ');
      if (typeof privileges === 'string') return privileges;
      return '';
    } },
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
        <Typography variant="h5">Roles</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen(null)}>
          Add Role
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
        <DialogTitle>{editId ? 'Edit Role' : 'Add Role'}</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Privileges (comma separated)" name="privileges" value={form.privileges} onChange={handleChange} fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{editId ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RolesPage; 