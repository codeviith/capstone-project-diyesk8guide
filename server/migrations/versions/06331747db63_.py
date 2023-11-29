"""empty message

Revision ID: 06331747db63
Revises: 7a0f3196bf37
Create Date: 2023-11-28 12:42:10.172741

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '06331747db63'
down_revision = '7a0f3196bf37'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('boards', schema=None) as batch_op:
        batch_op.add_column(sa.Column('deck_type', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('deck_length', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('deck_material', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('truck_type', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('truck_width', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('controller_feature', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('controller_type', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('remote_feature', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('remote_type', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('motor_size', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('motor_kv', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('wheel_size', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('wheel_type', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('battery_voltage', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('battery_type', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('battery_capacity', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('battery_configuration', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('range_mileage', sa.String(), nullable=False))
        batch_op.drop_constraint('fk_boards_truck_id_trucks', type_='foreignkey')
        batch_op.drop_constraint('fk_boards_remote_id_remotes', type_='foreignkey')
        batch_op.drop_constraint('fk_boards_max_speed_id_max_speeds', type_='foreignkey')
        batch_op.drop_constraint('fk_boards_motor_id_motors', type_='foreignkey')
        batch_op.drop_constraint('fk_boards_range_id_ranges', type_='foreignkey')
        batch_op.drop_constraint('fk_boards_wheel_id_wheels', type_='foreignkey')
        batch_op.drop_constraint('fk_boards_deck_id_decks', type_='foreignkey')
        batch_op.drop_constraint('fk_boards_battery_id_batteries', type_='foreignkey')
        batch_op.drop_constraint('fk_boards_user_id_users', type_='foreignkey')
        batch_op.drop_constraint('fk_boards_controller_id_controllers', type_='foreignkey')
        batch_op.drop_column('wheel_id')
        batch_op.drop_column('deck_id')
        batch_op.drop_column('battery_id')
        batch_op.drop_column('max_speed_id')
        batch_op.drop_column('motor_id')
        batch_op.drop_column('controller_id')
        batch_op.drop_column('remote_id')
        batch_op.drop_column('user_id')
        batch_op.drop_column('truck_id')
        batch_op.drop_column('range_id')

    with op.batch_alter_table('max_speeds', schema=None) as batch_op:
        batch_op.add_column(sa.Column('mph', sa.String(), nullable=False))
        batch_op.drop_column('speed')

    with op.batch_alter_table('motors', schema=None) as batch_op:
        batch_op.drop_column('type')

    with op.batch_alter_table('ranges', schema=None) as batch_op:
        batch_op.add_column(sa.Column('mileage', sa.String(), nullable=False))
        batch_op.drop_column('range')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('ranges', schema=None) as batch_op:
        batch_op.add_column(sa.Column('range', sa.VARCHAR(), nullable=False))
        batch_op.drop_column('mileage')

    with op.batch_alter_table('motors', schema=None) as batch_op:
        batch_op.add_column(sa.Column('type', sa.VARCHAR(), nullable=False))

    with op.batch_alter_table('max_speeds', schema=None) as batch_op:
        batch_op.add_column(sa.Column('speed', sa.VARCHAR(), nullable=False))
        batch_op.drop_column('mph')

    with op.batch_alter_table('boards', schema=None) as batch_op:
        batch_op.add_column(sa.Column('range_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('truck_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('remote_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('controller_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('motor_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('max_speed_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('battery_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('deck_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('wheel_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_boards_controller_id_controllers', 'controllers', ['controller_id'], ['id'])
        batch_op.create_foreign_key('fk_boards_user_id_users', 'users', ['user_id'], ['id'])
        batch_op.create_foreign_key('fk_boards_battery_id_batteries', 'batteries', ['battery_id'], ['id'])
        batch_op.create_foreign_key('fk_boards_deck_id_decks', 'decks', ['deck_id'], ['id'])
        batch_op.create_foreign_key('fk_boards_wheel_id_wheels', 'wheels', ['wheel_id'], ['id'])
        batch_op.create_foreign_key('fk_boards_range_id_ranges', 'ranges', ['range_id'], ['id'])
        batch_op.create_foreign_key('fk_boards_motor_id_motors', 'motors', ['motor_id'], ['id'])
        batch_op.create_foreign_key('fk_boards_max_speed_id_max_speeds', 'max_speeds', ['max_speed_id'], ['id'])
        batch_op.create_foreign_key('fk_boards_remote_id_remotes', 'remotes', ['remote_id'], ['id'])
        batch_op.create_foreign_key('fk_boards_truck_id_trucks', 'trucks', ['truck_id'], ['id'])
        batch_op.drop_column('range_mileage')
        batch_op.drop_column('battery_configuration')
        batch_op.drop_column('battery_capacity')
        batch_op.drop_column('battery_type')
        batch_op.drop_column('battery_voltage')
        batch_op.drop_column('wheel_type')
        batch_op.drop_column('wheel_size')
        batch_op.drop_column('motor_kv')
        batch_op.drop_column('motor_size')
        batch_op.drop_column('remote_type')
        batch_op.drop_column('remote_feature')
        batch_op.drop_column('controller_type')
        batch_op.drop_column('controller_feature')
        batch_op.drop_column('truck_width')
        batch_op.drop_column('truck_type')
        batch_op.drop_column('deck_material')
        batch_op.drop_column('deck_length')
        batch_op.drop_column('deck_type')

    # ### end Alembic commands ###
