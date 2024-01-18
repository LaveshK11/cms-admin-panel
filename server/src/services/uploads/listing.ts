

interface FormData {
    title: String;
    content: string;
}

class ListingServices {

    constructor() { }

    private async upload_opeation(data: FormData): Promise<object> {

        return { status: true, message: "data stored successfully " }

    }

    public async upload_lisitng(data: FormData): Promise<object> {

        const insertData: object = await this.upload_opeation(data)

        return insertData

    }

    public async getAllLisitng(): Promise<void> {

    }



}

export default ListingServices