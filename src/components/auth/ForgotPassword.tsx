import React, { type ChangeEvent, type FormEvent, useState } from "react";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NextLink from "next/link";
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import useRedirect from "@/customHooks/useRedirect";
import SubmitButton from "../common/SubmitButton";
import { fetcher } from "@/lib/fetcher";
import { type Status } from "../../types/status";

const ForgotPassword = () => {
    const [status, setStatus] = useState<Status>("idle");
    const [email, setEmail] = useState("");

    const { activateTimer } = useRedirect("/login", 4);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        setStatus("loading");

        const response = await fetcher("/api/user/password/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: email,
        });

        if (response.error) {
            setStatus("error");
            toast.error(response.error);
            setEmail("");
        } else {
            setStatus("success");
            setEmail("");
            activateTimer();
            toast.success(
                `An email has been sent to ${email}. Please follow the link to reset your password. Redirecting to login page`,
                {
                    autoClose: 4000,
                }
            );
        }
    };

    return (
        <Box
            component="main"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#e0e0e0",
                padding: 4,
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    width: "75%",
                    maxWidth: "900px",
                    display: "flex",
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                }}
            >
                {/* Left Side - Text Section */}
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        flex: 1,
                        padding: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{ color: "#333", fontWeight: "bold", mb: 2 }}
                    >
                        Forgot Your Password?
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        sx={{ color: "#666", mb: 2 }}
                    >
                        Enter your email address and we'll send you a link to
                        reset your password.
                    </Typography>
                </Box>

                {/* Right Side - Reset Password Form */}
                <Box
                    sx={{
                        backgroundColor: "#f9f9f9",
                        flex: 1,
                        padding: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <NextLink href="/login" passHref>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            sx={{ alignSelf: "flex-start", mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </NextLink>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                        Reset Password
                    </Typography>
                    <form onSubmit={onSubmit} style={{ width: "100%" }}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            margin="normal"
                            name="email"
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ) => {
                                setEmail(event.target.value);
                            }}
                            value={email}
                            type="email"
                            variant="outlined"
                            placeholder="Enter your email"
                            error={status === "error"}
                            helperText={
                                status === "error"
                                    ? "Please enter a valid email."
                                    : " "
                            }
                            sx={{ marginBottom: 2 }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={
                                status === "loading" || status === "success"
                            }
                            sx={{
                                padding: "10px 0",
                                backgroundColor: "#4caf50",
                                "&:hover": {
                                    backgroundColor: "#388e3c",
                                },
                                marginBottom: 2,
                            }}
                        >
                            {status === "loading"
                                ? "Sending..."
                                : "Reset Password"}
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Box>
    );
};

export default ForgotPassword;
