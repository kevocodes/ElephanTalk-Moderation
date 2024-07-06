import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { formatDate } from "@/utils/formatDate";
import { ChangeStatus } from "@/services/api";
import { useSession } from "next-auth/react";

export const MonitorModal = ({ report, isOpen, onClose, refresh }) => {
    
    const session = useSession();

    const handleApprove = (rep) => {
        const repstatus = async () => {
            try {
                const result = await ChangeStatus({
                    token: session?.data?.accessToken,
                    id: rep,
                    status: "accepted",
                });

                    onClose();
                    refresh(true);

            } catch (error) {

            }
        };

        repstatus();
    };

    const handleReject = (rep) => {
        const repstatus = async () => {
            try {
                const result = await ChangeStatus({
                    token: session?.data?.accessToken,
                    id: rep,
                    status: "rejected",
                });

                    onClose();
                    refresh(true);

            } catch (error) {

            }
        };

        repstatus()
    };

    return (
        <Dialog open={isOpen} onClose={onClose}
            PaperProps={{
                style: {
                    backdropFilter: "blur(5px)", // Adds the blur effect
                }
            }}
        >
            <DialogTitle className="text-darkprim text-center">Detalle del reporte</DialogTitle>
            <DialogContent>
                <div className="report-detail">
                    <p><strong>ID:</strong> {report?._id}</p>
                    <p><strong>Tipo de reporte:</strong> {report?.type}</p>
                    <p><strong>Etiquetas:</strong> {report?.tags?.join(', ')}</p>
                    <p><strong>Contenido:</strong> {report?.content}</p>
                    <p><strong>Usuario:</strong> {report?.user?.username}</p>
                    <p><strong>Fecha de creación:</strong> {formatDate(report?.createdAt)}</p>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleApprove(report?._id)} color="primary">
                    Aprobar
                </Button>
                <Button onClick={() => handleReject(report?._id)} color="error">
                    Rechazar
                </Button>
            </DialogActions>
        </Dialog>

    );
};