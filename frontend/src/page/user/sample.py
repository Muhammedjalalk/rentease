# original = [1, 2, [3, 4]]
# copy_slice=original[:]
# print(copy_slice)
# copy_slice[2][0]=99
# print(copy_slice)

# import copy
# deep_copy=copy.deepcopy(original)
# print(deep_copy)
# deep_copy[2][0]=100
# print(deep_copy)
# print(original)

def display_info(*args,**kwargs):
    print("Postional arugment (tuple): ",args)
    print("Keyword argument (Dictionary):",kwargs)


# display_info("Python","Development",2026,Level="Intermediate",Status="Active")

# import copy
# original=[1,2,[3,4]]
# shallow=copy.copy(original)
# deep=copy.deepcopy(original)
# original[2][0]=99
# print(f"Original: {original}")
# print(f"Shallow:{shallow}")
# print(f"Deep:{deep}")


# def count_up_to(n):
#     count=1
#     while count<=n:
#         yield count
#         count +=1
# counter=count_up_to(3)

# for num in counter:
#     print(num)
    

class Person:
    def __init__(self):
        self.__age=0
    def set_age(self,age):
        self.__age=age

    def get_age(self):
        return self.__age
    
p = Person()        # object created
p.set_age(25)       # set age
print(p.get_age()) 