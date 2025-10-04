import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import Index from "./pages/Index";
import HealthTips from "./pages/HealthTips";
import SymptomChecker from "./pages/SymptomChecker";
import FirstAid from "./pages/FirstAid";
import MedicineReminders from "./pages/MedicineReminders";
import EmergencyContacts from "./pages/EmergencyContacts";
import WellnessArticles from "./pages/WellnessArticles";
import PainMapper from "./pages/PainMapper";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/health-tips" element={<HealthTips />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/first-aid" element={<FirstAid />} />
            <Route path="/medicine-reminders" element={<MedicineReminders />} />
            <Route path="/emergency-contacts" element={<EmergencyContacts />} />
            <Route path="/wellness-articles" element={<WellnessArticles />} />
            <Route path="/pain-mapper" element={<PainMapper />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
