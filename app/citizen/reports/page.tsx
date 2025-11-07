"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { FileText, Plus } from "lucide-react"
import IssueForm from "@/components/issue-form"
import ComplaintsList from "@/components/complaints-list"

export default function CitizenReportsPage() {
  const [activeTab, setActiveTab] = useState("view")

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Environmental Reports
          </h1>
          <p className="text-muted-foreground">
            Report environmental issues in your community and track their resolution status.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="view" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              View Reports
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Report
            </TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="space-y-6">
            <Card className="p-6 border-accent/30 bg-card/50 backdrop-blur">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold text-foreground">Community Reports</h2>
              </div>
              <ComplaintsList />
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <IssueForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}