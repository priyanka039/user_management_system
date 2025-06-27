import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrganizations, createOrganization, editOrganization, removeOrganization } from '../app/organizationsSlice';
import { Box, Button, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const defaultForm = { name: '', description: '', email: '', phone: '', website: '', industry: '', employee_count: '' };

const OrganizationsPage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.organizations);
  const [open, setOpen] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [form, setForm] = React.useState(defaultForm);

  React.useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  const handleOpen = (org) => {
    setEditId(org ? org.id : null);
    setForm(org ? org : defaultForm);
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
      dispatch(editOrganization({ id: editId, updates: form }));
    } else {
      dispatch(createOrganization(form));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(removeOrganization(id));
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'industry', headerName: 'Industry', flex: 1 },
    { field: 'employee_count', headerName: 'Employees', flex: 1 },
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
        <Typography variant="h5">Organizations</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen(null)}>
          Add Organization
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
        <DialogTitle>{editId ? 'Edit Organization' : 'Add Organization'}</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Website" name="website" value={form.website} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Industry" name="industry" value={form.industry} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Employee Count" name="employee_count" value={form.employee_count} onChange={handleChange} fullWidth margin="normal" type="number" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{editId ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrganizationsPage; 