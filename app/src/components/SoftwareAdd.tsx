import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

type SoftwareAddProps = {
    affiliateProduct: {
        id:string
        name: string
        description: string
        affiliate_link: string
        image: string
        affiliate_message:string
        field:string
    }
}

export default function SoftwareAdd({ affiliateProduct }: SoftwareAddProps) {
    return (
        <>
            <div className="mt-10 p-5 rounded-xl bg-green-300/20">
                <div className="flex items-center space-x-4 mb-6">
                    <img
                        src={`http://127.0.0.1:8090/api/files/affiliate_product/${affiliateProduct.id}/${affiliateProduct.image}`}
                        alt={affiliateProduct.name}
                        className="w-16 h-16 rounded-lg"
                    />
                    <div>
                        <p className="text-lg font-semibold">{affiliateProduct.name}</p>
                        <p className={'text-muted-foreground'}>{affiliateProduct.description}</p>

                    </div>
                </div>
                <Button className={'w-full'} asChild>
                    <Link target={'_blank'} to={affiliateProduct.affiliate_link}>{affiliateProduct.affiliate_message}</Link>
                </Button>
            </div>
        </>
    )
}