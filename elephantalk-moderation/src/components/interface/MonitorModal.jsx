import React from "react"
import { Modal, Box, Typography } from "@mui/material";
import { formatDate } from "@/utils/formatDate";

export const MonitorModal = ({ report, isOpen, onClose }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };


    const handleApprove = (rep) => {

    };

    const handleReject = (rep) => {

    };

    return (

        < Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Detalle del Reporte
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="report-detail">
                        <p><strong>ID:</strong> {report?._id}</p>
                        <p><strong>Tipo de reporte:</strong> {report?.type}</p>
                        <p><strong>Etiquetas:</strong> {report?.tags?.join(', ')}</p>
                        <p><strong>Contenido:</strong> {report?.content}</p>
                        <p><strong>Usuario:</strong> {report?.user?.username}</p>
                        <p><strong>Fecha de creación:</strong> {formatDate(report?.createdAt)}</p>
                    </div>
                </Typography>
            </Box>
        </ Modal >

    );
};