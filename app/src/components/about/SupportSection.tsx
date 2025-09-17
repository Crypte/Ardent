import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {FaXTwitter} from "react-icons/fa6";
import {BiSupport} from "react-icons/bi";
import {Link} from "react-router-dom";
import {CONTACT} from "@/constants/contact.ts";

const supportData = [
  {
    title: "Nous contacter",
    link: CONTACT.CONTACT_EMAIL,
    href: `mailto:${CONTACT.CONTACT_EMAIL}`,
    icon: <BiSupport/>,
  },
  {
    title: "Suivez-nous",
    link: `@${CONTACT.TWITTER_ACCOUNT}`,
    href: `https://twitter.com/${CONTACT.TWITTER_ACCOUNT}`,
    target: "_blank",
    rel: "noopener noreferrer",
    icon:<FaXTwitter/>
  }
];

export default function SupportSection() {
  return (
    <Card className="bg-tertiary border-tertiary-foreground">
        <CardHeader>
            <CardTitle className={'text-xl'}>Nous contacter ou nous suivre</CardTitle>
            <CardDescription className={'text-sm'}>Besoin d'aide ou simple envie d'échanger ?</CardDescription>
        </CardHeader>
      <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportData.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg">
                <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">{item.title}</p>
                  <Button asChild variant="link" className="p-0 h-auto text-sm">
                    <Link to={item.href} {...(item.target && { target: item.target, rel: item.rel })}>
                      {item.link}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
      </CardContent>
    </Card>
  );
}