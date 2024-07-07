import React from "react"
import { Dialog, DialogTitle, DialogContent} from "@mui/material";
import { formatDate } from "@/utils/formatDate";


export const HistoryModal = ({ report, isOpen, onClose }) => {
    
    return (
        <Dialog open={isOpen} onClose={onClose}
            PaperProps={{
                style: {
                    backdropFilter: "blur(5px)", // Adds the blur effect
                }
            }}
        >
            <DialogTitle className="text-darkprim text-center">
                Detalle del reporte
                {report?.status && (
                    <span className="absolute text-sm top-2 right-4 text-blue-500">
                        {report.status}
                    </span>
                )}    
            </DialogTitle>
            <DialogContent>
                <div className="report-detail">
                    <p><strong>ID:</strong> {report?._id}</p>
                    <p><strong>Tipo de reporte:</strong> {report?.type}</p>
                    <p><strong>Etiquetas:</strong> {report?.tags?.join(', ')}</p>
                    <p><strong>Contenido:</strong> {report?.content}</p>
                    <p><strong>Usuario:</strong> {report?.user?.username}</p>
                    <p><strong>Revisado por:</strong> {report?.reviewer?.username}</p>
                    <p><strong>Fecha de revision:</strong> {formatDate(report?.updatedAt)}</p>
                    <p><strong>Fecha de creación:</strong> {formatDate(report?.createdAt)}</p>
                </div>
            </DialogContent>
        </Dialog>

    );
};