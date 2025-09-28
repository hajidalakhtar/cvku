'use client';

import * as React from 'react';
import { ArchiveX, Command, File, Inbox, Send, Trash2 } from 'lucide-react';

import { NavUser } from '@/packages/components/nav-user';
import { Label } from '@/packages/components/ui/label';
import { useArtboardStore } from '@/store/artboard';
import { defaultResumeData } from '@/libs/schema';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/packages/components/ui/sidebar';
import { Switch } from '@/packages/components/ui/switch';

// This is sample data
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  navMain: [
    {
      title: 'Inbox',
      url: '#',
      icon: Inbox,
      isActive: true
    },
    {
      title: 'Drafts',
      url: '#',
      icon: File,
      isActive: false
    },
    {
      title: 'Sent',
      url: '#',
      icon: Send,
      isActive: false
    },
    {
      title: 'Junk',
      url: '#',
      icon: ArchiveX,
      isActive: false
    },
    {
      title: 'Trash',
      url: '#',
      icon: Trash2,
      isActive: false
    }
  ],
  mails: [
    {
      name: 'William Smith',
      email: 'williamsmith@example.com',
      subject: 'Meeting Tomorrow',
      date: '09:34 AM',
      teaser:
        'Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.'
    },
    {
      name: 'Alice Smith',
      email: 'alicesmith@example.com',
      subject: 'Re: Project Update',
      date: 'Yesterday',
      teaser:
        'Thanks for the update. The progress looks great so far.\nLet\'s schedule a call to discuss the next steps.'
    },
    {
      name: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      subject: 'Weekend Plans',
      date: '2 days ago',
      teaser:
        'Hey everyone! I\'m thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?'
    },
    {
      name: 'Emily Davis',
      email: 'emilydavis@example.com',
      subject: 'Re: Question about Budget',
      date: '2 days ago',
      teaser:
        'I\'ve reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?'
    },
    {
      name: 'Michael Wilson',
      email: 'michaelwilson@example.com',
      subject: 'Important Announcement',
      date: '1 week ago',
      teaser:
        'Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company\'s future.'
    },
    {
      name: 'Sarah Brown',
      email: 'sarahbrown@example.com',
      subject: 'Re: Feedback on Proposal',
      date: '1 week ago',
      teaser:
        'Thank you for sending over the proposal. I\'ve reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?'
    },
    {
      name: 'David Lee',
      email: 'davidlee@example.com',
      subject: 'New Project Idea',
      date: '1 week ago',
      teaser:
        'I\'ve been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?'
    },
    {
      name: 'Olivia Wilson',
      email: 'oliviawilson@example.com',
      subject: 'Vacation Plans',
      date: '1 week ago',
      teaser:
        'Just a heads up that I\'ll be taking a two-week vacation next month.\nI\'ll make sure all my projects are up to date before I leave.'
    },
    {
      name: 'James Martin',
      email: 'jamesmartin@example.com',
      subject: 'Re: Conference Registration',
      date: '1 week ago',
      teaser:
        'I\'ve completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.'
    },
    {
      name: 'Sophia White',
      email: 'sophiawhite@example.com',
      subject: 'Team Dinner',
      date: '1 week ago',
      teaser:
        'To celebrate our recent project success, I\'d like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.'
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const [mails, setMails] = React.useState(data.mails);
  const [isLoading, setIsLoading] = React.useState(true);
  const { setOpen } = useSidebar();

  const { resume, setResume } = useArtboardStore();

  // Local state for form inputs
  const [formData, setFormData] = React.useState({
    name: '',
    headline: '',
    email: '',
    phone: '',
    location: '',
    url: '',
    pictureUrl: ''
  });

  // Initialize resume if not exists
  React.useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (resume != null) {
      setIsLoading(false);

      setFormData({
        name: resume.basics.name,
        headline: resume.basics.headline,
        email: resume.basics.email,
        phone: resume.basics.phone,
        location: resume.basics.location,
        url: 'resume.basics.url',
        pictureUrl: 'resume.basics.pictureUrl'
      });

    }

    // if (!resume) {
    //   setResume(defaultResumeData);
    // }

  }, [resume, setResume]);

  // Update form data when resume changes
  // React.useEffect(() => {
  //   if (resume && resume.basics) {
  //     setFormData({
  //       name: resume.basics.name || '',
  //       headline: resume.basics.headline || '',
  //       email: resume.basics.email || '',
  //       phone: resume.basics.phone || '',
  //       location: resume.basics.location || '',
  //       url: resume.basics.url?.href || '',
  //       pictureUrl: resume.basics.picture?.url || ''
  //     });
  //   }
  // }, [resume]);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle save
  const handleSave = () => {
    if (!resume) return;

    const updatedResume = {
      ...resume,
      basics: {
        ...resume.basics,
        name: formData.name,
        headline: formData.headline,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        url: {
          ...resume.basics.url,
          href: formData.url
        },
        picture: {
          ...resume.basics.picture,
          url: formData.pictureUrl
        }
      }
    };

    console.log(updatedResume);;

    setResume(updatedResume);
  };

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >

      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false
                      }}
                      onClick={() => {
                        setActiveItem(item);
                        const mail = data.mails.sort(() => Math.random() - 0.5);
                        setMails(
                          mail.slice(
                            0,
                            Math.max(5, Math.floor(Math.random() * 10) + 1)
                          )
                        );
                        setOpen(true);
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem?.title}
            </div>
            <Label className="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch className="shadow-none" />
            </Label>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {isLoading ? (
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                  <p className="text-center text-sm text-gray-500">Loading resume data...</p>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Headline</label>
                    <input
                      type="text"
                      value={formData.headline}
                      onChange={(e) => handleInputChange('headline', e.target.value)}
                      placeholder="Your professional title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Your phone number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, Country"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Website URL</label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => handleInputChange('url', e.target.value)}
                      placeholder="https://your-website.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Picture URL</label>
                    <input
                      type="url"
                      value={formData.pictureUrl}
                      onChange={(e) => handleInputChange('pictureUrl', e.target.value)}
                      placeholder="https://your-photo.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleSave}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                    >
                      Save Basic Info
                    </button>
                  </div>
                </div>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
