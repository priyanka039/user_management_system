import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLegalEntities, createLegalEntity, editLegalEntity, removeLegalEntity } from '../app/legalEntitiesSlice';
import { Box, Button, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const defaultForm = { name: '', legal_name: '', legal_entity_type: '', address: '', incorporation_date: '', is_default: false, registration_number: '', tax_identifier: '', jurisdiction_country: '', functional_currency: '', tenant_id: '' };

const LegalEntitiesPage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.legalEntities);
  const [open, setOpen] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [form, setForm] = React.useState(defaultForm);

  React.useEffect(() => {
    dispatch(fetchLegalEntities());
  }, [dispatch]);

  const handleOpen = (entity) => {
    setEditId(entity ? entity.id : null);
    setForm(entity ? entity : defaultForm);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(defaultForm);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = () => {
    if (editId) {
      dispatch(editLegalEntity({ id: editId, updates: form }));
    } else {
      dispatch(createLegalEntity(form));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(removeLegalEntity(id));
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'legal_name', headerName: 'Legal Name', flex: 1 },
    { field: 'legal_entity_type', headerName: 'Type', flex: 1 },
    { field: 'jurisdiction_country', headerName: 'Country', flex: 1 },
    { field: 'functional_currency', headerName: 'Currency', flex: 1 },
    { field: 'is_default', headerName: 'Default', flex: 1, type: 'boolean' },
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
        <Typography variant="h5">Legal Entities</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen(null)}>
          Add Legal Entity
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
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editId ? 'Edit Legal Entity' : 'Add Legal Entity'}</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Legal Name" name="legal_name" value={form.legal_name} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Type" name="legal_entity_type" value={form.legal_entity_type} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Address" name="address" value={form.address} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Incorporation Date" name="incorporation_date" value={form.incorporation_date} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Registration Number" name="registration_number" value={form.registration_number} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Tax Identifier" name="tax_identifier" value={form.tax_identifier} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Country" name="jurisdiction_country" value={form.jurisdiction_country} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Currency" name="functional_currency" value={form.functional_currency} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Tenant ID" name="tenant_id" value={form.tenant_id} onChange={handleChange} fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{editId ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LegalEntitiesPage; 