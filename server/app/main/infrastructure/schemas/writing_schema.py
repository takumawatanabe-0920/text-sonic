from pydantic import BaseModel


class WritingBase(BaseModel):
    title: str
    description: str


class WritingGet(WritingBase):
    id: int
    created_at: str
    updated_at: str

    class Config:
        orm_mode = True


class WritingCreate(WritingBase):
    pass


class WritingUpdate(WritingBase):
    pass


class Writing(WritingBase):
    class Config:
        orm_mode = True
