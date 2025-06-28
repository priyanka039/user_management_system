import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, editUser, removeUser } from '../app/usersSlice';
import { Box, Button, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const defaultForm = { email: '', first_name: '', last_name: '', organization_id: '', tenant_id: '', roles: '' };

const UsersPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.users);
  const tenant_id = useSelector((state) => state.auth.user?.tenant_id);
  const [open, setOpen] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [form, setForm] = React.useState(defaultForm);

  React.useEffect(() => {
    if (tenant_id) dispatch(fetchUsers(tenant_id));
  }, [dispatch, tenant_id]);

  const handleOpen = (user) => {
    setEditId(user ? user.id : null);
    setForm(user ? user : defaultForm);
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
      dispatch(editUser({ tenant_id, id: editId, updates: form }));
    } else {
      dispatch(createUser({ tenant_id, user: form }));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(removeUser({ tenant_id, id }));
  };

  const columns = [
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'first_name', headerName: 'First Name', flex: 1 },
    { field: 'last_name', headerName: 'Last Name', flex: 1 },
    { field: 'organization_id', headerName: 'Org ID', flex: 1 },
    { field: 'tenant_id', headerName: 'Tenant ID', flex: 1 },
    { field: 'roles', headerName: 'Roles', flex: 1, valueGetter: (params) => {
      const row = params?.row || {};
      const roles = row.roles;
      if (Array.isArray(roles)) return roles.join(', ');
      if (typeof roles === 'string') return roles;
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
        <Typography variant="h5">Users</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen(null)}>
          Add User
        </Button>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
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
        <DialogTitle>{editId ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="First Name" name="first_name" value={form.first_name} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Last Name" name="last_name" value={form.last_name} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Organization ID" name="organization_id" value={form.organization_id} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Tenant ID" name="tenant_id" value={form.tenant_id} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Roles (comma separated)" name="roles" value={form.roles} onChange={handleChange} fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{editId ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersPage; 