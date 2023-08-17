export function PastTransaction ({recipient,email,amount,time}) {
    return (
        <li className="flex flex-col sm:grid sm:grid-cols-2 gap-2 mt-4">
            <div className="flex flex-row gap-1">
                <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-b from-indigo-900 to-rose-900"></div>
                <blockquote className="flex flex-col justify-center">
                    <span>{recipient}</span>
                    <span className="text-gray-600 text-sm">{email}</span>
                </blockquote>
            </div>

            <div className="flex flex-row justify-between">
                <span className="font-semibold text-gray-600">₦{amount}</span>
                <span className="text-gray-600">{time} ago</span>
            </div>
        </li>
    )
}