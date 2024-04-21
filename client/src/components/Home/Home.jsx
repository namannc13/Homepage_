import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Tab from "./Tab/Tab";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import {
  Barn,
  Cat,
  Code,
  GithubLogo,
  InstagramLogo,
  Mailbox,
  PinterestLogo,
  RedditLogo,
  TwitchLogo,
  TwitterLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { Trash } from "lucide-react";
import { Keyboard } from "lucide-react";
import {
  submitFormFailure,
  submitFormStart,
  submitFormSuccess,
} from "@/Redux/user/userSlice";
import { useDispatch } from "react-redux";
export default function Home() {
  const dispatch = useDispatch((state) => state.user)
  const [tabValue, setTabValue] = useState("my_links");
  const [rerender, setRerender] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    tag: "",
    url: "",
    iconName: "",
  });
  const [userLinks, setUserLinks] = useState([]);
  const { error, loading } = useSelector((state) => state.user);

  const icons = [
    {
      iconTag: <GithubLogo size={24} weight="duotone" />,
      iconName: "github",
    },
    {
      iconTag: <TwitterLogo size={24} weight="duotone" />,
      iconName: "twitter",
    },
    {
      iconTag: <YoutubeLogo size={24} weight="duotone" />,
      iconName: "youtube",
    },
    {
      iconTag: <PinterestLogo size={24} weight="duotone" />,
      iconName: "pinterest",
    },
    {
      iconTag: <InstagramLogo size={24} weight="duotone" />,
      iconName: "instagram",
    },
    {
      iconTag: <TwitchLogo size={24} weight="duotone" />,
      iconName: "twitch",
    },
    {
      iconTag: <RedditLogo size={24} weight="duotone" />,
      iconName: "reddit",
    },
    {
      iconTag: <Trash size={24} weight="duotone" />,
      iconName: "trash",
    },
    {
      iconTag: <Keyboard size={24} weight="duotone" />,
      iconName: "monkeytype",
    },
    {
      iconTag: <Mailbox size={24} weight="duotone" />,
      iconName: "gmail",
    },
    {
      iconTag: <Code size={24} weight="duotone" />,
      iconName: "code",
    },
    {
      iconTag: <Cat size={24} weight="duotone" />,
      iconName: "hianime",
    },
    {
      iconTag: <Barn size={24} weight="duotone" />,
      iconName: "default",
    },
  ];

  const handleChangeIcon = (icon) => {
    setFormData({ ...formData, iconName: icon });
  };

  const SocialSections =
    userLinks.length != 0
      ? userLinks.filter((section) => section.tag === "socials")
      : [];

  const NormSections =
    userLinks.length != 0
      ? userLinks.filter((section) => section.tag === "norm")
      : [];

  const StudySections =
    userLinks.length != 0
      ? userLinks.filter((section) => section.tag === "study")
      : [];

  const AnimeSections =
    userLinks.length != 0
      ? userLinks.filter((section) => section.tag === "anime")
      : [];

  useEffect(() => {
    const fetchUserLinks = async () => {
      try {
        const res = await fetch("/api/link/getLinks");
        const data = await res.json();
        setUserLinks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserLinks();
  }, [rerender]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleChangeDropDown = (tag) => {
    return (e) => {
      setFormData({ ...formData, tag: tag });
    };
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(submitFormStart());
      const res = await fetch("/api/link/addLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(submitFormFailure(data.message));
        return;
      }
      dispatch(submitFormSuccess(data));
      setRerender(!rerender);
    } catch (error) {
      dispatch(submitFormFailure(error.message));
    }
  };
  return (
    <div className="mt-2">
      <Tabs defaultValue="my_links" className="w-full">
        <TabsList>
          <TabsTrigger
            value="my_links"
            onClick={() => setTabValue("my_links")}
          >
            My Links
          </TabsTrigger>
          <TabsTrigger value="tasu" onClick={() => setTabValue("tasu")}>
            Tasu
          </TabsTrigger>
        </TabsList>

        {tabValue == "my_links" ? (
          <>
            {SocialSections.length > 0 && (
              <TabsContent value="my_links">
                <h1 className="my-2 px-2 text-lg font-semibold text-foreground uppercase">
                  Socials
                </h1>
              </TabsContent>
            )}
            {SocialSections.length > 0 && (
              <div className="w-full sm:grid sm:grid-cols-3 sm:gap-4 mb-10">
                {SocialSections.map((section) => (
                  <TabsContent
                    key={section.name}
                    value="my_links"
                    className="flex justify-between"
                  >
                    <Tab
                      name={section.name}
                      url={section.url}
                      iconName={section.iconName}
                      setUserLinks={setUserLinks}
                    />
                  </TabsContent>
                ))}
              </div>
            )}
            {NormSections.length > 0 && (
              <TabsContent value="my_links">
                <h1 className="my-2 px-2 text-lg font-semibold text-foreground uppercase">
                  Norm
                </h1>
              </TabsContent>
            )}
            {NormSections.length > 0 && (
              <div className="w-full sm:grid sm:grid-cols-3 sm:gap-4 mb-10">
                {NormSections.map((section) => (
                  <TabsContent
                    key={section.name}
                    value="my_links"
                    className="flex justify-between"
                  >
                    <Tab
                      name={section.name}
                      url={section.url}
                      iconName={section.iconName}
                      setUserLinks={setUserLinks}
                    />
                  </TabsContent>
                ))}
              </div>
            )}
            {StudySections.length > 0 && (
              <TabsContent value="my_links">
                <h1 className="my-2 px-2 text-lg font-semibold text-foreground uppercase">
                  Study
                </h1>
              </TabsContent>
            )}
            {StudySections.length > 0 && (
              <div className="w-full sm:grid sm:grid-cols-3 sm:gap-4 mb-10">
                {StudySections.map((section) => (
                  <TabsContent
                    key={section.name}
                    value="my_links"
                    className="flex justify-between"
                  >
                    <Tab
                      name={section.name}
                      iconName={section.iconName}
                      url={section.url}
                      setUserLinks={setUserLinks}
                    />
                  </TabsContent>
                ))}
              </div>
            )}
            {AnimeSections.length > 0 && (
              <TabsContent value="my_links">
                <h1 className="my-2 px-2 text-lg font-semibold text-foreground uppercase">
                  Anime
                </h1>
              </TabsContent>
            )}
            {AnimeSections.length > 0 && (
              <div className="w-full sm:grid sm:grid-cols-3 sm:gap-4 mb-10">
                {AnimeSections.map((section) => (
                  <TabsContent
                    key={section.name}
                    value="my_links"
                    className="flex justify-between"
                  >
                    <Tab
                      name={section.name}
                      url={section.url}
                      iconName={section.iconName}
                      setUserLinks={setUserLinks}
                    />
                  </TabsContent>
                ))}
              </div>
            )}
          </>
        ) : (
          <TabsContent value="tasu">
            <div className="p-3 max-w-lg mx-auto mt-2 border w-full rounded-lg bg-card">
              <h1 className="text-3xl text-center font-semibold my-7">
                Add Link
              </h1>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  type="text"
                  placeholder="name"
                  className=""
                  id="name"
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  placeholder="username"
                  className=""
                  id="username"
                  onChange={handleChange}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Tag</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleChangeDropDown("socials")}>
                      Socials
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleChangeDropDown("norm")}>
                      Norm
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleChangeDropDown("study")}>
                      Study
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleChangeDropDown("anime")}>
                      Anime
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Choose Icon</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="grid grid-cols-5 gap-4"
                  >
                    {icons.map((icon, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => handleChangeIcon(icon.iconName)}
                      >
                        {icon.iconTag}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Input
                  type="text"
                  placeholder="url"
                  className=""
                  id="url"
                  onChange={handleChange}
                />
                <Button size="sm" disabled={loading} className="uppercase bg-foreground">
                  {loading ? "loading..." : "Add"}
                </Button>
              </form>
              {error && <p className="mt-5 text-red-500 text-sm">{error}</p>}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
