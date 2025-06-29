import React, { useState } from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomButton } from "@/components/ui/custom-button";
import {
  Calendar,
  Clock,
  MessageSquare,
  User,
  Users,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UpcomingSession {
  id: string;
  mentor: string;
  mentorAvatar: string;
  topic: string;
  date: string;
  time: string;
  isVideo: boolean;
}

interface ProgressItem {
  title: string;
  progress: number;
  color: string;
}

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const upcomingSessions: UpcomingSession[] = [
    {
      id: "1",
      mentor: "David Miller",
      mentorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      topic: "Career Growth in Tech",
      date: "Today",
      time: "3:00 PM",
      isVideo: true,
    },
    {
      id: "2",
      mentor: "Sarah Wong",
      mentorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      topic: "Leadership Skills",
      date: "Tomorrow",
      time: "11:30 AM",
      isVideo: false,
    },
  ];

  const progressItems: ProgressItem[] = [
    { title: "Profile Completion", progress: 65, color: "bg-blue-500" },
    { title: "Sessions Completed", progress: 40, color: "bg-emerald-500" },
    { title: "Goals Achieved", progress: 25, color: "bg-amber-500" },
  ];

  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <MainLayout>
      <div className="space-y-8 mt-14">
        {/* Welcome Section */}
        <section className="bg-primary/5 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10 px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-2xl border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold mb-2">
                  Welcome back, Alex!
                </h1>
                <p className="text-muted-foreground">
                  Track your progress and upcoming sessions with mentors.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <CustomButton
                  size="sm"
                  onClick={() => navigate("/mentors")}
                  className="flex gap-2 items-center"
                >
                  <Users className="h-4 w-4" />
                  Find Mentors
                </CustomButton>
                <CustomButton
                  size="sm"
                  variant="outline"
                  onClick={() => navigate("/schedule")}
                  className="flex gap-2 items-center"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule Session
                </CustomButton>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Activity Overview */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Your Sessions</CardTitle>
              <CardDescription>
                Manage your upcoming and past mentoring sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Tabs */}
              <div className="flex border-b mb-4">
                <button
                  className={cn(
                    "pb-2 px-4 text-sm font-medium transition-colors relative",
                    activeTab === "upcoming"
                      ? "text-primary border-b-2 border-primary -mb-[2px]"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Upcoming
                </button>
                <button
                  className={cn(
                    "pb-2 px-4 text-sm font-medium transition-colors relative",
                    activeTab === "past"
                      ? "text-primary border-b-2 border-primary -mb-[2px]"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveTab("past")}
                >
                  Past Sessions
                </button>
              </div>

              {activeTab === "upcoming" ? (
                <div className="space-y-4">
                  {upcomingSessions.length > 0 ? (
                    upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-sm transition-shadow"
                      >
                        <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={session.mentorAvatar}
                            alt={session.mentor}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="font-medium">{session.topic}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <User className="h-3 w-3" /> {session.mentor}
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-3 w-3" /> {session.date}
                            </span>
                            <span className="text-xs flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" /> {session.time}
                            </span>
                            <span className="text-xs flex items-center gap-1 text-muted-foreground">
                              {session.isVideo ? (
                                <>
                                  <Video className="h-3 w-3" /> Video
                                </>
                              ) : (
                                <>
                                  <MessageSquare className="h-3 w-3" /> Chat
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                        <CustomButton size="sm" variant="outline">
                          Join
                        </CustomButton>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        You have no upcoming sessions
                      </p>
                      <CustomButton onClick={() => navigate("/mentors")}>
                        Find a Mentor
                      </CustomButton>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No past sessions yet
                  </p>
                  <CustomButton onClick={() => navigate("/mentors")}>
                    Schedule Your First Session
                  </CustomButton>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progress Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>
                  Track your activity and growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressItems.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {item.progress}%
                        </span>
                      </div>
                      <Progress value={item.progress} className={item.color} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended</CardTitle>
                <CardDescription>
                  Mentors that match your interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/women/68.jpg"
                        alt="Jennifer Lee"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">Jennifer Lee</p>
                      <p className="text-xs text-muted-foreground">
                        UX Design Lead
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/men/42.jpg"
                        alt="Michael Chen"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">Michael Chen</p>
                      <p className="text-xs text-muted-foreground">
                        Software Architect
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/women/22.jpg"
                        alt="Sophia Patel"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">Sophia Patel</p>
                      <p className="text-xs text-muted-foreground">
                        Marketing Director
                      </p>
                    </div>
                  </div>

                  <CustomButton
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/mentors")}
                  >
                    View All
                  </CustomButton>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
