import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TherapistLoginPage from "./pages/TherapistLoginPage";
import TherapistDashboardPage from "./pages/TherapistDashboardPage";
import UserDashboardPage from "./pages/UsersDashboardPage";
import TherapistsPage from "./pages/TherapistsPage";
import TherapistProfilePage from "./pages/TherapistProfilePage";
import AppointmentsPage from "./pages/AppointmentsPage";
import CommunityPage from "./pages/CommunityPage";
import NotFound from "./pages/NotFound";
import AccountPage from "./pages/AccountPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/login" element={<Layout><LoginPage /></Layout>} />
            <Route path="/signup" element={<Layout><SignupPage /></Layout>} />
            <Route path="/therapist-login" element={<Layout><TherapistLoginPage /></Layout>} />
            <Route path="/therapists/:id" element={<TherapistProfilePage />} />
            
            {/* Therapist routes */}
            <Route path="/therapist-dashboard" element={
              <Layout>
                <ProtectedRoute requiredUserType="therapist" redirectToLogin={true}>
                  <TherapistDashboardPage />
                </ProtectedRoute>
              </Layout>
            } />
            
            {/* User routes */}
            <Route path="/user-dashboard" element={
              <Layout>
                <ProtectedRoute requiredUserType="user" redirectToLogin={true}>
                  <UserDashboardPage />
                </ProtectedRoute>
              </Layout>
            } />
            
            {/* Pages that are visible in navigation but require authentication to access */}
            <Route path="/therapists" element={
              <Layout>
                <ProtectedRoute redirectToLogin={true}>
                  <TherapistsPage />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="/therapist/:id" element={
              <Layout>
                <ProtectedRoute redirectToLogin={true}>
                  <TherapistProfilePage />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="/appointments" element={
              <Layout>
                <ProtectedRoute redirectToLogin={true}>
                  <AppointmentsPage />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="/community" element={
              <Layout>
                <ProtectedRoute redirectToLogin={true}>
                  <CommunityPage />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="/account" element={
              <Layout>
                <ProtectedRoute redirectToLogin={true}>
                  <AccountPage />
                </ProtectedRoute>
              </Layout>
            } />
            
            {/* Default route for any unmatched paths */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
