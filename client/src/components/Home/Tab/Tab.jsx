import {
  GithubLogo,
  TwitterLogo,
  YoutubeLogo,
  PinterestLogo,
  InstagramLogo,
  TwitchLogo,
  RedditLogo,
  Trash,
  Keyboard,
  Mailbox,
  Code,
  Cat,
  Barn,
  TrashSimple,
} from "@phosphor-icons/react";

export default function Tab({ name, url, iconName, setUserLinks }) {
  const handleVisitPage = () => {
    window.location.href = url;
  };

  const handleDeleteTab = async () => {
    try {
      const res = await fetch("/api/link/deleteLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserLinks((prev) => prev.filter((link) => link.name !== name));
    } catch (error) {
      console.log(error.message);
    }
  };

  let iconComponent;

  switch (iconName) {
    case "github":
      iconComponent = <GithubLogo size={24} weight="duotone" />;
      break;

    case "twitter":
      iconComponent = <TwitterLogo size={24} weight="duotone" />;
      break;

    case "youtube":
      iconComponent = <YoutubeLogo size={24} weight="duotone" />;
      break;

    case "pinterest":
      iconComponent = <PinterestLogo size={24} weight="duotone" />;
      break;

    case "instagram":
      iconComponent = <InstagramLogo size={24} weight="duotone" />;
      break;

    case "twitch":
      iconComponent = <TwitchLogo size={24} weight="duotone" />;
      break;

    case "reddit":
      iconComponent = <RedditLogo size={24} weight="duotone" />;
      break;

    case "chalkpad":
      iconComponent = <Trash size={24} weight="duotone" />;
      break;

    case "monkeytype":
      iconComponent = <Keyboard size={24} weight="duotone" />;
      break;

    case "gmail":
      iconComponent = <Mailbox size={24} weight="duotone" />;
      break;

    case "leetcode":
      iconComponent = <Code size={24} weight="duotone" />;
      break;

    case "code":
      iconComponent = <Code size={24} weight="duotone" />;
      break;

    case "hianime":
      iconComponent = <Cat size={24} weight="duotone" />;
      break;

    case "trash":
      iconComponent = <TrashSimple size={24} weight="duotone"/>;
      break;

    default:
      iconComponent = <Barn size={24} weight="duotone" />;
      break;
  }
  return (
    <div
      className="w-full rounded-md border bg-card text-card-foreground shadow p-2 hover:cursor-pointer hover:bg-muted flex flex-row justify-between items-center"
    >
      <div
        className="w-full flex flex-row items-center justify-between"
        onClick={handleVisitPage}
      >
        {iconComponent}

        <h1 className="px-2 text-md font-semibold text-muted-foreground hover:cursor-pointer text-center">
          {name}
        </h1>
      </div>
      <TrashSimple
        size={24}
        className="hover:text-red-500"
        onClick={handleDeleteTab}
        weight="regular"
      />
    </div>
  );
}
