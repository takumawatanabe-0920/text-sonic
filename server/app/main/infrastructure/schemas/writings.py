from pydantic import BaseModel


class WritingBase(BaseModel):
    title: str
    description: str


class WritingCreate(WritingBase):
    pass


class WritingUpdate(WritingBase):
    pass


class Writing(WritingBase):
    class Config:
        orm_mode = True
